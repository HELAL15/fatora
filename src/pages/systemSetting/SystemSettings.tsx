import SystemCard from '../../components/common/SystemCard';
import SystemHeading from '../../components/common/SystemHeading';
import TagTitle from '../../components/common/TagTitle';
import systemItems from '../../lib/data/SystemItemsData';

const SystemSettings = () => {
  const systemItemsMapped = systemItems.map((item, index) => {
    const isFirstItem = item.id === 1;
    const { id, title, items } = item;
    const length = systemItems.length;
    const current = index + 1;
    const itemsInside = items.map((item) => {
      const { id, title: itemTitle, add, view } = item;
      return (
        <SystemCard
          key={id}
          title={`${title}.${itemTitle}`}
          add={add}
          view={view}
        />
      );
    });
    return (
      <section key={id} className={isFirstItem ? '!mt-0' : ''}>
        <div className="container-fluid">
          <SystemHeading title={title} length={length} current={current} />
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {itemsInside}
          </div>
        </div>
      </section>
    );
  });

  return (
    <>
      <TagTitle title="system" />
      {systemItemsMapped}
    </>
  );
};

export default SystemSettings;
