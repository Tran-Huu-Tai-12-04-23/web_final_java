import { TextMain, TextSub, WishlistItem } from "../../components";

function WishlistList() {
  const userId = "yourUserId";

  return (
    <div className="mt-24 px-2 flex-col justify-start items-start gap-2 inline-flex">
      <div className="text-neutral-950">
        <TextMain>Wish list</TextMain>
      </div>
      <div className="text-neutral-500 leading-normal">
        <TextSub>See your favorites list here</TextSub>
      </div>
      <div
        className="wishlist-items-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
        }}
      >
        {getList(userId)}
      </div>
    </div>
  );
}

const getList = (userId) => {
  const items = [];
  for (let i = 0; i < 6; i++) {
    items.push(<WishlistItem key={i} />);
  }
  return <>{items}</>;
};

export default WishlistList;
