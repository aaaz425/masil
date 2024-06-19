import React from 'react';
import Icon from '@/components/Icon';

type CheckComponentProps = {
  check1: boolean | undefined;
  check2: boolean | undefined;
  check3: boolean | undefined;
  setCheckType: (check: string, boolean: boolean) => void;
};

export default function CheckComponent({
  check1,
  check2,
  check3,
  setCheckType,
}: CheckComponentProps) {
  const onCheckHandler = (checkType?: number) => {
    switch (checkType) {
      case 1:
        setCheckType('check1', !check1);
        setCheckType('check2', !check1);
        setCheckType('check3', !check1);
        break;
      case 2:
        setCheckType('check2', !check2);
        break;
      case 3:
        setCheckType('check3', !check3);
        break;
      default:
        null;
    }
  };
  console.log('check2 = ', check2);
  console.log('check3 = ', check3);
  return (
    <>
      <div className="px-3">
        <div className="mt-2 flex content-center justify-between">
          <span className="ml-1 font-bold">전체 동의</span>
          <span className="cursor-pointer" onClick={() => onCheckHandler(1)}>
            {check2 && check3 ? (
              <Icon name="checkbox_check" className="size-6 inline-block" />
            ) : (
              <Icon
                name="checkbox"
                className="size-5 inline-block opacity-40 "
              />
            )}
          </span>
        </div>
        <div className="my-3 flex content-center justify-between">
          <span className="text-sm">
            <span className="font-bold">(필수)</span> 마실 이용 약관
          </span>
          <span className="cursor-pointer" onClick={() => onCheckHandler(2)}>
            {check2 ? (
              <Icon name="checkbox_check" className="size-6 inline-block" />
            ) : (
              <Icon
                name="checkbox"
                className="size-5 inline-block opacity-40 "
              />
            )}
          </span>
        </div>
        <div className="flex content-center justify-between">
          <span className="text-sm">
            <span className="font-bold">(필수)</span> 개인정보 수집 및 이용
          </span>
          <span className="cursor-pointer" onClick={() => onCheckHandler(3)}>
            {check3 ? (
              <Icon name="checkbox_check" className="size-6 inline-block" />
            ) : (
              <Icon
                name="checkbox"
                className="size-5 inline-block opacity-40 "
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
}
