import { useFormik } from 'formik';
import _ from 'lodash';
import type { ChangeEventHandler, FC } from 'react';
// import zipcodeJa from 'zipcode-ja';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './OrderForm.styles';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

type ZipCodeResponse = {
  status: number;
  message: string;
  results: {
    zipcode: string;
    prefcode: string;
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
  }[];
}

const zipCodeFetcher = async (zipCode: string) => {
  const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
  const data = await response.json() as ZipCodeResponse;
  return data;
}

export const zipCodeFormatter = async (zipCode: string) => {
  const zipCodeResponse = await zipCodeFetcher(zipCode);

  const { address1, address2, address3 } = zipCodeResponse.results[0];

  return [address1, address2, address3];
}

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik<OrderFormValue>({
    initialValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
    onSubmit,
  });

  const handleZipcodeChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    formik.handleChange(event);

    const zipCode = event.target.value;
    const address = await zipCodeFormatter(zipCode);
    const prefecture = address.shift();
    const city = address.join(' ');

    formik.setFieldValue('prefecture', prefecture);
    formik.setFieldValue('city', city);
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={formik.handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipcodeChange}
            placeholder="例: 1500042"
            value={formik.values.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={formik.handleChange}
            placeholder="例: 東京都"
            value={formik.values.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={formik.handleChange}
            placeholder="例: 渋谷区宇田川町"
            value={formik.values.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={formik.handleChange}
            placeholder="例: 40番1号 Abema Towers"
            value={formik.values.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
