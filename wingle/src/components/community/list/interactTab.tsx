import ListCard from "./listCard";

export default function InteractTab(props: { imgUrl: string }) {
  return <ListCard imgUrl={props.imgUrl} isNotice={false}></ListCard>;
}
