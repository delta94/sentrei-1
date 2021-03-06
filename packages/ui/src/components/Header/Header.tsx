import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import HeaderButton from "@sentrei/ui/components/HeaderButton";
import HeaderScrollButton from "@sentrei/ui/components/HeaderScrollButton";

import Logo from "@sentrei/ui/components/Logo";
import PaperCups from "@sentrei/ui/components/PaperCups";

import HeaderStyles from "./HeaderStyles";

export interface Props {
  logo: JSX.Element;
  type?: "about" | "default" | "landing";
}

export default function Header({logo, type = "default"}: Props): JSX.Element {
  const classes = HeaderStyles();
  const {t} = useTranslation();

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.transparent]: true,
    [classes.paper]: false,
  });

  const headerColorChange = (): void => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > 0) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.paper);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.paper);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", headerColorChange);
    return function cleanup(): void {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  return (
    <>
      <PaperCups />
      <div className={classes.grow}>
        <AppBar position="fixed" className={appBarClasses}>
          <Toolbar>
            <Grid container alignItems="center" justify="center">
              <Logo logo={logo} href="/" />
              <div className={classes.spy}>
                <Grid item>
                  <Hidden smDown implementation="css">
                    {type === "about" && (
                      <>
                        <HeaderScrollButton
                          href="mission"
                          title={t("header:about.mission")}
                        />
                        <HeaderScrollButton
                          href="team"
                          title={t("header:about.team")}
                        />
                        <HeaderScrollButton
                          href="investor"
                          title={t("header:about.investor")}
                        />
                      </>
                    )}
                    {type === "default" && (
                      <>
                        <HeaderButton
                          href="/about"
                          title={t("header:default.about")}
                        />
                        <HeaderButton
                          href="/"
                          title={t("header:default.home")}
                        />
                        <HeaderButton
                          href="/pricing"
                          title={t("header:default.pricing")}
                        />
                      </>
                    )}
                    {type === "landing" && (
                      <>
                        <HeaderScrollButton
                          href="product"
                          title={t("header:landing.product")}
                        />
                        <HeaderScrollButton
                          href="testimonial"
                          title={t("header:landing.testimonial")}
                        />
                        <HeaderScrollButton
                          href="pricing"
                          title={t("header:landing.pricing")}
                        />
                        <HeaderScrollButton
                          href="faq"
                          title={t("header:landing.faq")}
                        />
                      </>
                    )}
                  </Hidden>
                </Grid>
              </div>
              <div className={classes.sectionDesktop}>
                <Grid item>
                  <Link href="/login">
                    <Button
                      color="primary"
                      variant="outlined"
                      className={classes.margin}
                    >
                      <Typography>{t("header:header.login")}</Typography>
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.margin}
                    >
                      <Typography>{t("header:header.signup")}</Typography>
                    </Button>
                  </Link>
                  <IconButton edge="end">
                    <DarkModeButton />
                  </IconButton>
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton edge="end">
                  <DarkModeButton />
                </IconButton>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
      <Box py={3} />
    </>
  );
}
