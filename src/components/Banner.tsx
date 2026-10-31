import { Fragment } from "react";
import { BookOpen, Heart, Zap, type LucideIcon } from "lucide-react";
import BannerSlider from "@/components/BannerSlider";

const FEATURES: { icon: LucideIcon; title: string; desc?: string }[] = [
  { icon: BookOpen, title: "Huge Collection", desc: "of Books" },
  { icon: Zap, title: "Instant Access" },
  { icon: Heart, title: "Personalized", desc: "Recommendations" },
];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#fdf9f1_0%,#f8efdf_45%,#f1e4cd_100%)]">
      {/* Soft light/shadow blobs echoing the reference's sunlit wall */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-[#efdcc0]/70 blur-3xl" />
        <div className="absolute right-1/4 top-12 size-64 rounded-full bg-[#faf1e2]/80 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-[#eee0c4]/70 blur-3xl" />
      </div>

      {/* Slider (3 slides, Swiper.js) */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <BannerSlider />
      </div>

      {/* Feature strip */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/10 pt-8">
          {FEATURES.map((feature, index) => (
            <Fragment key={feature.title}>
              {index > 0 && (
                <span aria-hidden className="hidden h-9 w-px bg-ink/15 sm:block" />
              )}
              <div className="flex items-center gap-3">
                <feature.icon className="size-5 shrink-0 text-brand" />
                <span className="text-sm leading-tight text-ink/60">
                  <strong className="block font-semibold text-ink">
                    {feature.title}
                  </strong>
                  {feature.desc}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
