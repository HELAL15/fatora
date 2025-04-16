import { Link } from 'react-router';

const Home = () => {
  return (
    <section className="h-[75dvh] grid place-items-center">
      <div className="container-fluid">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary">
          welcome to fatora system
        </h1>
        <Link to={'/branch'}>branch</Link>
      </div>
    </section>
  );
};

export default Home;
