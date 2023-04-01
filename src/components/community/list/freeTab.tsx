import ListCard from "./listCard";

export default function FreeTab(props: { imgUrl: string }) {
  return <ListCard imgUrl={props.imgUrl} isNotice={false}></ListCard>;
}
