import { useQuery } from '@tanstack/react-query';
import { getData } from '../utils/helpers/SendRequestes';
import { useTranslation } from 'react-i18next';

interface IProps {
  endpoint: string;
  keys: (string | number | boolean)[];
  enabled?: boolean;
}

const useFetch = ({ endpoint = '', keys = [], enabled }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [...keys, language],
    queryFn: () => getData(endpoint),
    enabled: enabled,
  });

  return { data, isLoading, isError, refetch, isFetching };
};

export default useFetch;
