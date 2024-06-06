import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import Icon from '../../components/Icon';

export default function HomeFAB() {
  return (
    <Link
      href={ROUTE_PATH.WRITE}
      className="fixed z-10 bottom-24 right-24 hover:cursor-pointer">
      <div className="flex justify-center items-center w-48 h-48 rounded-full bg-primary">
        <Icon name="write" filter="WHITE" />
      </div>
    </Link>
  );
}