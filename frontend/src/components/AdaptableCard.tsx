import classNames from "classnames";
import Card from "@/components/ui/Card";
import type { CardProps } from "@/components/ui/Card";

interface AdaptableCardProps extends CardProps {
  leftSideBorder?: boolean;
  rightSideBorder?: boolean;
  divider?: boolean;
  shadow?: boolean;
  isLastChild?: boolean;
}

const AdaptableCard = (props: AdaptableCardProps) => {
  const {
    className,
    children,
    bodyClass,
    leftSideBorder,
    rightSideBorder,
    divider,
    shadow,
    isLastChild,
    ...rest
  } = props;

  return (
    <Card className={classNames(className)} {...rest}>
      {children}
    </Card>
  );
};

export default AdaptableCard;
