import Image from "next/image";
import star from "../../../public/icons/star_on.svg";
import Pagenation from "./Pagenation";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { ReviewData } from "@/apis/activityDetails/activityDetails.type";
import { getReviews } from "@/apis/activityDetails/activityDetails";
import TempComment from "./TempComment";
import { useState } from "react";
import ReviewSkeleton from "./ReviewSkeleton";

interface ReviewProps {
  activityId: number;
}

const Review = ({ activityId }: ReviewProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contentsPerPage = 3;

  const { isLoading, data } = useQuery<ReviewData>({
    queryKey: ["reviews", activityId, currentPage],
    queryFn: () => getReviews(activityId, currentPage, contentsPerPage),
  });

  function calculateSatisfaction(averageRating: number): string {
    if (averageRating >= 0 && averageRating < 1) {
      return "매우 불만족";
    } else if (averageRating >= 1 && averageRating < 2) {
      return "불만족";
    } else if (averageRating >= 2 && averageRating < 3) {
      return "보통";
    } else if (averageRating >= 3 && averageRating < 4) {
      return "만족";
    } else if (averageRating >= 4 && averageRating <= 5) {
      return "매우 만족";
    } else {
      return "평가 불가";
    }
  }

  const satisfaction = data
    ? calculateSatisfaction(data.averageRating)
    : "아직 후기가 없습니다.";

  const totalPages = data ? Math.ceil(data.totalCount / contentsPerPage) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <ReviewSkeleton />;

  if (!data) return null;

  return (
    <div className="mb-52 mt-6 flex flex-col items-center gap-6  tablet:items-center">
      {data.totalCount === 0 ? (
        <div>아직 후기가 없어요!</div>
      ) : (
        <div className="flex flex-col gap-6 tablet:w-[728px]">
          <div>
            <h1 className="text-xl font-bold">후기</h1>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-[50px] font-semibold">
              {data.averageRating.toFixed(1)}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-normal">{satisfaction}</div>
              <div className="flex flex-row gap-1.5 text-sm font-normal">
                <Image src={star} alt="rankIcon" width={15} height={15} />
                {data.totalCount}개 후기
              </div>
            </div>
          </div>
          {data.reviews.map((review) => (
            <Comment
              key={review.id}
              profileImageUrl={review.user.profileImageUrl}
              nickname={review.user.nickname}
              content={review.content}
              createdAt={review.createdAt}
            />
          ))}
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Review;
