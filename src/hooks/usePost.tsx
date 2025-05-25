// import {
//   useMutation,
//   useQueryClient,
//   MutationFunction
// } from '@tanstack/react-query';
// import { sendPayload } from '../lib/utils/SendRequestes';
// import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendPayload } from '../utils/helpers/SendRequestes';
import { toast } from 'sonner';

// interface UsePostOptions<TData = any, TVariables = any> {
//   endpoint: string;
//   invalidateQueryKey?: (string | number)[];
//   onSuccess?: Array<(data: TData) => void>;
//   onError?: Array<(error: any) => void>;
//   close?: () => void;
//   mutationFn?: MutationFunction<TData, TVariables>;
// }

// const usePost = <TData, TVariables = FormData>({
//   endpoint,
//   invalidateQueryKey,
//   onSuccess = [],
//   onError = [],
//   close,
//   mutationFn
// }: UsePostOptions<TData, TVariables>) => {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isError, error, isSuccess, data } = useMutation<
//     TData,
//     Error,
//     TVariables
//   >({
//     mutationFn: mutationFn ?? ((data) => sendPayload(endpoint, data)),
//     onSuccess: (data) => {
//       if (invalidateQueryKey) {
//         queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
//       }

//       toast.success((data?.message as string) ?? 'Success');

//       // Call all onSuccess callbacks
//       onSuccess.forEach((fn) => fn(data));

//       if (close) close();
//     },
//     onError: (error) => {
//       toast.error(error.message ?? 'Something went wrong');

//       // Call all onError callbacks
//       onError.forEach((fn) => fn(error));
//     }
//   });

//   return {
//     mutate,
//     isPending,
//     isError,
//     error,
//     isSuccess,
//     data
//   };
// };

// export default usePost;

interface IProps {
  endpoint: string;
  revalid: Array<string | number>;
  onSuccess?: () => void;
}

const usePost = ({ endpoint = '', revalid = [], onSuccess }: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: FormData) => sendPayload(endpoint, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...revalid],
      });
      toast.success(data.message);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError };
};

export default usePost;
