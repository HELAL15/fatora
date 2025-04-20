import { useForm } from 'react-hook-form';
import { message, Spin } from 'antd';
import logo from '../assets/logo.png';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { sendPayload } from '../lib/utils/SendRequestes';
import FormInput from '../components/common/FormInput';
import Button from '../components/ui/Button';
import Img from '../components/ui/Img';

interface IFormInput extends Record<string, unknown> {
  email: string;
  password: string;
}

const LoginDashboard = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IFormInput>({
    mode: 'all'
  });

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: IFormInput) => sendPayload('admin/login', payload),
    onSuccess: (data) => {
      reset();

      const { name, email, phone, id, access_token } = data?.data || {};

      Cookies.set('accessTokenAdmin', access_token, {
        secure: true,
        sameSite: 'strict',
        path: '/'
      });

      const AdminData = {
        name: name,
        email: email,
        phone: phone,
        id: id
      };
      console.log(AdminData);

      // dispatch(setAdmin(AdminData));

      navigate('/dashboard');

      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.message || error.message);
      if (error instanceof AxiosError) {
        message.error(error.message || error.message);
      }
    }
  });

  const onSubmit = (values: IFormInput) => {
    mutate(values);
    navigate('/');
  };

  return (
    <>
      {/* <CustomHelmet /> */}
      <section className="h-dvh grid place-items-center p-0 !m-0">
        <div className="container max-w-[550px]">
          <Spin spinning={isPending} size="large">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4  bg-white py-12 px-8 rounded-rounded shadow-sm"
            >
              <div className="flex items-center justify-center flex-col gap-4">
                <Img
                  src={logo}
                  alt="system invoice logo"
                  cx="object-contain w-64"
                />

                <p className="text-slate-400">{t('loginDashboard.desc')}</p>
              </div>
              <FormInput
                name="email"
                label={t('email')}
                placeholder={t('email')}
                rules={{
                  required: t(`input.error.required`, {
                    label: t(`input.label.email`)
                  })
                }}
                control={control}
                errors={errors}
              />
              <FormInput
                name="password"
                label={t('password')}
                type="password"
                placeholder={t('password')}
                rules={{
                  required: t(`input.error.required`, {
                    label: t(`input.label.password`)
                  })
                }}
                control={control}
                errors={errors}
              />
              <div className="flex items-center justify-center pt-4">
                <Button title="login" />
              </div>
            </form>
          </Spin>
        </div>
      </section>
    </>
  );
};

export default LoginDashboard;
