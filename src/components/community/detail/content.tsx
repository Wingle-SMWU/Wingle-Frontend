import { Text } from "../../ui";

export const Content = ({
  text,
  isNotice,
  isDetail,
}: {
  text: string;
  isNotice: boolean;
  isDetail: boolean;
}) => {
  const hasH2Tag = text.includes("</h2>") && isDetail;
  const hasH3Tag = text.includes("</h3>") && isDetail;
  const hasH4Tag = text.includes("</h4>") && isDetail;
  const hasBoldTag = text.includes("</b>") && isDetail;
  const title = text.replace(/<[^>]*>?/g, "");

  // Function to render text with <br> if isDetail is true
  const renderTextWithBr = (content: JSX.Element) => {
    return isDetail ? (
      <>
        {content}
        <br />
      </>
    ) : (
      content
    );
  };

  if (isNotice) {
    if (hasH2Tag) {
      return <Text.Title3 color="gray900">{title}</Text.Title3>;
    } else if (hasH3Tag || hasH4Tag || hasBoldTag) {
      return renderTextWithBr(<Text.Body1 color="gray900">{title}</Text.Body1>);
    } else {
      return renderTextWithBr(
        <Text.Body2 color="gray900" pointer={!isDetail}>
          {title}
        </Text.Body2>
      );
    }
  } else {
    return (
      <>
        <div>{text}</div>
      </>
    );
  }
};
