import { useState } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

interface ActivityRegistInfoProps {
  handleFormData: (name: string, value: string | number) => void;
}

const ActivityRegistInfo = ({ handleFormData }: ActivityRegistInfoProps) => {
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const maxLength = 500;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    handleFormData("category", e.target.value);
  };

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const selectedAddress = data.address;
        setAddress(selectedAddress);
        handleFormData("address", selectedAddress);
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-6">
      <input
        className="rounded border border-gnGray700 bg-white px-4 py-[15px] text-base font-normal"
        placeholder="제목"
        onBlur={(e) => handleFormData("title", e.target.value)}
      />
      <select
        className="rounded border border-gnGray700 bg-white px-4 py-[15px] text-base font-normal"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option disabled>카테고리</option>
        <option value={"문화 · 예술"}>문화 · 예술</option>
        <option value={"식음료"}>식음료</option>
        <option value={"스포츠"}>스포츠</option>
        <option value={"투어"}>투어</option>
        <option value={"관광"}>관광</option>
        <option value={"웰빙"}>웰빙</option>
      </select>
      <textarea
        className="h-[346px] resize-none rounded border border-gnGray700 bg-white p-4 text-base font-normal"
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={(e) => handleFormData("description", e.target.value)}
        maxLength={500}
      />
      {description.length >= maxLength && (
        <p className="text-lg font-normal text-gnDarkRed">
          * 500자 이내로 작성해주세요.
        </p>
      )}
      <div className="flex flex-col gap-4">
        <label className="text-2xl font-bold text-gnDarkBlack">가격</label>
        <input
          className="rounded border border-gnGray700 bg-white px-4 py-[15px] text-base font-normal"
          type="number"
          placeholder="가격"
          onBlur={(e) => handleFormData("price", parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-2xl font-bold text-gnDarkBlack">주소</label>
        <input
          className="rounded border border-gnGray700 bg-white px-4 py-[15px] text-base font-normal"
          placeholder="주소"
          value={address}
          onClick={openDaumPostcode}
          readOnly
        />
      </div>
    </div>
  );
};

export default ActivityRegistInfo;
