export default function DashboardLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="panel h-36 animate-pulse rounded-3xl" key={index} />
      ))}
    </div>
  );
}
