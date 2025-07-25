type EventFormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const EventFormLayout = ({ title, children }: EventFormLayoutProps) => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {children}
    </div>
  </div>
);
