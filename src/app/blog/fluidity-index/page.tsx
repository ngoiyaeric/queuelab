import dynamic from 'next/dynamic';

const FluidityIndexClient = dynamic(
  () => import('./FluidityIndexClient'),
  { ssr: false }
);

const FluidityIndexPage = () => {
  return <FluidityIndexClient />;
};

export default FluidityIndexPage;
