import { Text } from "../../ui";

export const Content = ({
  text,
  isNotice,
  isDetail,
}: {
  text: string;
  isNotice: boolean;
  isDetail: boolean;
}): JSX.Element => {
  if (isNotice && text.includes("</h2>")) {
    const title = text.replace(/<[^>]*>?/g, "");
    return isDetail ? (
      <Text.Title3 color="gray900">{title}</Text.Title3>
    ) : (
      <Text.Body2 color="gray900" pointer={true}>
        {title}
      </Text.Body2>
    );
  } else {
    return (
      <div>
        {text}
        {isDetail && <br />}
      </div>
    );
  }
};
