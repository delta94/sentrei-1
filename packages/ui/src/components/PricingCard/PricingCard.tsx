import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Link from "next-translate/Link";
import * as React from "react";

import PricingCardStyles from "./PricingCardStyles";

export interface Props {
  action?: string;
  buttonText: string;
  buttonVariant: "text" | "outlined" | "contained";
  description1: string;
  description2: string;
  description3: string;
  href: string;
  perUser: string;
  price: string;
  priceMonth: string;
  subTitle?: string;
  title: string;
}

export default function PricingCard({
  action,
  buttonText,
  buttonVariant,
  description1,
  description2,
  description3,
  href,
  perUser,
  price,
  priceMonth,
  subTitle,
  title,
}: Props): JSX.Element {
  const classes = PricingCardStyles();

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subTitle}
        titleTypographyProps={{align: "center"}}
        subheaderTypographyProps={{align: "center"}}
        action={action}
        className={classes.cardHeader}
      />
      <CardContent>
        <div className={classes.cardPricing}>
          <Typography component="h2" variant="h3" color="textPrimary">
            {price}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {priceMonth}
          </Typography>
          &nbsp;
          <Typography component="p" color="textSecondary">
            {perUser}
          </Typography>
        </div>

        {[description1, description2, description3].map((line: string) => (
          <ListItem key={line}>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                noWrap: true,
                align: "left",
                component: "p",
                variant: "subtitle1",
              }}
            >
              {line}
            </ListItemText>
          </ListItem>
        ))}
      </CardContent>
      <CardActions>
        <Link href={href}>
          <Button fullWidth variant={buttonVariant} color="primary">
            {buttonText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
