import {FormControl, MenuItem, Typography, Select} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import React from "react";

import {useAudioInputDevices} from "@sentrei/video/components/MenuBar/DeviceSelector/deviceHooks";
import LocalAudioLevelIndicator from "@sentrei/video/components/MenuBar/DeviceSelector/LocalAudioLevelIndicator";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default function AudioInputList(): JSX.Element {
  const classes = useStyles();
  const audioInputDevices = useAudioInputDevices();
  const {
    room: {localParticipant},
    localTracks,
    getLocalAudioTrack,
  } = useVideoContext();

  const localAudioTrack = localTracks.find(track => track.kind === "audio");
  const localAudioInputDeviceId = localAudioTrack?.mediaStreamTrack.getSettings()
    .deviceId;

  function replaceTrack(newDeviceId: string): void {
    localAudioTrack?.stop();
    getLocalAudioTrack(newDeviceId).then(newTrack => {
      if (localAudioTrack) {
        const localTrackPublication = localParticipant?.unpublishTrack(
          localAudioTrack,
        );
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant?.emit("trackUnpublished", localTrackPublication);
      }

      localParticipant?.publishTrack(newTrack);
    });
  }

  return (
    <div className={classes.container}>
      <div className="inputSelect">
        {audioInputDevices.length > 1 ? (
          <FormControl fullWidth>
            <Typography variant="h6">Audio Input:</Typography>
            <Select
              onChange={(
                e: React.ChangeEvent<{
                  name?: string | undefined;
                  value: unknown;
                }>,
              ): void => replaceTrack(e.target.value as string)}
              value={localAudioInputDeviceId || ""}
            >
              {audioInputDevices.map(device => (
                <MenuItem value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <Typography variant="h6">Audio Input:</Typography>
            <Typography>
              {localAudioTrack?.mediaStreamTrack.label || "No Local Audio"}
            </Typography>
          </>
        )}
      </div>
      <LocalAudioLevelIndicator />
    </div>
  );
}
