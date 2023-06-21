import Image from "next/image";

type AvatarProps = {
  src: string;
};

export default function Avatar(props: AvatarProps) {
  const { src } = props;
  return (
    <figure className="h-8 w-8 min-w-[32px] rounded-full bg-black overflow-hidden shadow">
      <Image src={src} alt="user profile" width={"40"} height={40} />
    </figure>
  );
}
