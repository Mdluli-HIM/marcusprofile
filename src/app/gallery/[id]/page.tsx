import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { GalleryDetailView } from "@/components/gallery/gallery-detail-view";
import { getSketchById, sketches } from "@/data/gallery";

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sketch = getSketchById(id);

  if (!sketch) {
    notFound();
  }

  const index = sketches.findIndex((item) => item.id === sketch.id);

  return (
    <SiteShell>
      <GalleryDetailView
        sketch={sketch}
        index={index}
        total={sketches.length}
      />
    </SiteShell>
  );
}
