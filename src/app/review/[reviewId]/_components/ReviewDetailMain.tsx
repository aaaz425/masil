import { getReviewDetail } from '@/api/server';
import ReviewItemCafeInfo from '@/app/_components/review/ReviewItem/ReviewItemCafeInfo';
import ReviewItemHeader from '@/app/_components/review/ReviewItem/ReviewItemHeader';
import ReviewItemImages from '@/app/_components/review/ReviewItem/ReviewItemImages';
import DetailHeader from '@/components/Header/DetailHeader';
import ErrorComponent from '../error';
import ReviewDetailContent from './ReviewDetailContent';
import ReviewDetailRating from './ReviewDetailRating';
import ReviewDetailSubInfo from './ReviewDetailSubInfo';
import ReviewDetailTags from './ReviewDetailTags';

type ReviewDetailMainProps = { reviewId: string };

export default async function ReviewDetailMain({
  reviewId,
}: ReviewDetailMainProps) {
  const { data, error } = await getReviewDetail(reviewId);
  const reviewDetail = data!.data;

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  return (
    <>
      <DetailHeader />
      <main className="flex flex-col gap-16 px-20 py-24">
        <div className="flex flex-col gap-12">
          <ReviewItemHeader
            profileImageUrl={reviewDetail.profileImageUrl}
            nickName={reviewDetail.nickName}
            createdAt={reviewDetail.createdAt}
          />
          <div className="flex flex-col gap-24">
            <ReviewItemImages reviewImageUrls={reviewDetail.reviewImageUrls} />
            <ReviewDetailContent content={reviewDetail.content} />
            <ReviewDetailRating rating={reviewDetail.rating} />
            <ReviewDetailTags tags={reviewDetail.tags} />
          </div>
          <ReviewItemCafeInfo cafeInfo={reviewDetail.cafeInfo} />
        </div>
        <span className="h-[1px] border-b border-bg_disabled" />
        <ReviewDetailSubInfo
          reviewId={+reviewId}
          isLike={reviewDetail.isLike}
          likeCount={reviewDetail.likeCount}
        />
      </main>
    </>
  );
}
