import { lazy, Suspense } from 'react';
import { createStore } from '@wsh-2025/client/src/app/createStore';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';

const RecommendedSection = lazy(() =>
  import('@wsh-2025/client/src/features/recommended/components/RecommendedSection').then((m) => ({
    default: m.RecommendedSection,
  }))
);

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ referenceId: 'error' });
  return { modules };
};

export const NotFoundPage = () => {
  const modules = useRecommended({ referenceId: 'error' });
  const module = modules.at(0);

  return (
    <>
      <title>見つかりません - AremaTV</title>

      <div className="w-full px-[32px] py-[48px]">
        <section className="mb-[32px] flex w-full flex-col items-center justify-center gap-y-[20px]">
          <h1 className="text-[32px] font-bold text-[#ffffff]">ページが見つかりませんでした</h1>
          <p>あなたが見ようとしたページは、残念ながら見つけられませんでした。</p>
          <img alt="" loading="lazy" className="h-auto w-[640px]" src="/public/animations/001.gif" />
        </section>

        <section>
          <Suspense fallback={<div className="text-white">おすすめ読み込み中...</div>}>
            {module != null ? <RecommendedSection module={module} /> : null}
          </Suspense>
        </section>
      </div>
    </>
  );
};
