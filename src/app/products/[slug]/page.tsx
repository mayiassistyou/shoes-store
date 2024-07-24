export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

function Product({ params }: Props): JSX.Element {
  return <section>{params.slug}</section>;
}
export default Product;
