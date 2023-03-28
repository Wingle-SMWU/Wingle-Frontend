import ListCard from "./listCard";

export default function NoticeTab(props: { imgUrl: string }) {
  return <ListCard imgUrl={props.imgUrl} isNotice={true}></ListCard>;
}
