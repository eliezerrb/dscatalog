type Props = {
  price: number;
  // permitir filhos no component
  children: React.ReactNode;
};

const TestChildren = ({ price, children }: Props) => {
  return (
    <>
      {/* Posso ter os filhos antes e dempos  {children} */}
      {children}
      <h1>Preço = {price}</h1>
      {children}
    </>
  );
};

export default TestChildren;
