import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface Props {
  data: typeof shopData[0];
}

const Shops: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <h2>welcome to my shop</h2>
      <p>{data.name} </p>
      <p>{data.rating} </p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
};

const shopData = [
  {
    name: "mickel",
    rating: 4,
  },
  {
    name: "john",
    rating: 4.5,
  },
];

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      data: shopData[parseInt(context.params?.id as string)],
    },
  };
};

export default Shops;
