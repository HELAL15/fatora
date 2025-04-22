import { RiBankLine } from 'react-icons/ri';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import HomeCard from '../components/common/home/HomeCard';
import SectionWithContainer from '../components/common/SectionWithContainer';
import Wrapper from '../components/common/Wrapper';
import { IoSettingsOutline } from 'react-icons/io5';
import LineChart from '../components/charts/LineChart';
import PolarChart from '../components/charts/PolarChart';
import Table from '../components/common/Table';

const Home = () => {
  return (
    // <section className="h-[75dvh] grid place-items-center">
    //   <div className="container-fluid">
    //     <h1 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary">
    //       welcome to fatora system
    //     </h1>
    //     <Link to={'/branch'}>branch</Link>
    //   </div>
    // </section>
    <>
      <SectionWithContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <HomeCard
            href="/system"
            title="system"
            icon={<IoSettingsOutline />}
          />
          <HomeCard href="/system/banks" title="banks" icon={<RiBankLine />} />
          <HomeCard href="/branch" title="branch" />
        </div>
      </SectionWithContainer>
      <SectionWithContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Wrapper cx="grid place-items-center">
            <PieChart />
          </Wrapper>
          <Wrapper cx="grid place-items-center">
            <BarChart />
          </Wrapper>
          <Wrapper cx="grid place-items-center">
            <LineChart />
          </Wrapper>
          <Wrapper cx="grid place-items-center">
            <PolarChart />
          </Wrapper>
        </div>
      </SectionWithContainer>
      <Table />
    </>
  );
};

export default Home;
