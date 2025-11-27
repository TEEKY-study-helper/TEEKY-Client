import { HeaderSection } from "@/app/_components/sections/HeaderSection";
import { HeroSection } from "@/app/_components/sections/HeroSection";
import { InfoSectionList } from "@/app/_components/sections/InfoSectionList";
import { PrimaryButton } from "@/app/_components/buttons/PrimaryButton";
import { SecondaryButton } from "@/app/_components/buttons/SecondaryButton";
import type { SectionItem } from "@/app/types";

const sectionItems: SectionItem[] = [
  {
    title: "섹션 A",
    description: "섹션 A 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
  },
  {
    title: "섹션 B",
    description: "섹션 B 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
  },
  {
    title: "섹션 C",
    description: "섹션 C 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#eeeeee] flex justify-center px-4">
      <div className="flex w-full max-w-[375px] min-h-screen flex-col gap-6 py-6">
        <HeaderSection
          eyebrow="Teeky Frame Base"
          title="웹앱 기반 375 기준 레이아웃"
          description="웹앱 기반 대학생활 나만의 공부도우미, Teeky"
        />

        <main className="flex-1 space-y-5">
          <HeroSection
            title="핵심 메시지"
            description="히어로 섹션 중요한 요소때 사용할것"
          />
          <InfoSectionList items={sectionItems} />
        </main>

        <nav className="flex gap-3 rounded-3xl border border-[#e5e5e5] bg-white px-4 py-4">
          <SecondaryButton>보조 버튼</SecondaryButton>
          <PrimaryButton>주요 버튼</PrimaryButton>
        </nav>
      </div>
    </div>
  );
}
