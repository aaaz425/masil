'use client';

import clsx from 'clsx';
import React, {
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useModalStore,
  useRegisterStore,
  useValidate,
} from '@/store/userStore';

export default function EmailForm() {
  const modal = useModalStore();
  const validate = useValidate();
  const userInfo = useRegisterStore();

  const [email, setEmail] = useState<string>('');
  const [emailNum, setEmailNum] = useState<string>('');
  const [certification, setCertification] = useState<string>('');

  const [checkEmail, setCheckEmail] = useState<boolean>(true);
  const [checkCertification, setCheckCertification] = useState<boolean>(true);

  const emailInputRef = useRef<RefObject<HTMLInputElement>>(null);

  useEffect(() => {
    setEmailNum(validate.certification);
  }, [validate.certification]);

  const emailCheck = () => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test(email)) {
      return false;
    } else {
      userInfo.setEmail(email);
      return true;
    }
  };

  const emailValidate = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (emailCheck()) {
        modal.changeStatus();
        setCheckEmail(true);
        emailInputRef.current.blur();
      } else {
        setCheckEmail(false);
        console.log('이메일의 형식이 올바르지 않습니다.');
      }
    }
  };

  const checkCertifiHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (certification === validate.certification) {
        userInfo.setAgree();
        setCheckCertification(true);
      } else {
        setCheckCertification(false);
      }
    }
  };

  return (
    <>
      <div className="w-72 font-sans text-24 text-center">
        이메일 주소로 10초만에 가입해 마실을 시작하세요
      </div>
      <div className="flex justify-center w-72">
        <input
          disabled={validate.certification.length > 0}
          ref={emailInputRef}
          onKeyDown={emailValidate}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx('w-full', 'bg-gray', 'rounded-lg', 'p-16', {
            ['cursor-not-allowed']: validate.certification.length > 0,
            ['opacity-60']: validate.certification.length > 0,
          })}
          type="text"
        />
      </div>
      <div
        className={clsx('justify-center', 'w-72', {
          ['hidden']: emailNum.length === 0,
        })}>
        <input
          className="w-full bg-gray  rounded-lg p-16"
          type="text"
          placeholder="인증번호를 입력해주세요"
          onChange={(e) => setCertification(e.target.value)}
          onKeyDown={checkCertifiHandler}
        />
      </div>
      <div className={clsx('flex justify-center', 'w-72')}>
        <span
          className={clsx('text-text_error', 'font-semibold', {
            ['hidden']: checkEmail === true,
          })}>
          올바르지 않은 이메일 형식입니다.
        </span>

        <span
          className={clsx('text-text_error', 'font-semibold', {
            ['hidden']: checkCertification === true,
          })}>
          인증번호가 일치하지 않습니다.
        </span>
      </div>
    </>
  );
}
