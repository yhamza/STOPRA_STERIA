export interface DataEntry {
  totalInteractions: number;
  categoryBreakdown: { [key: string]: number };
  actionBreakdown: { [key: string]: number };
  uniqueActions: string[];
  uniqueCategories: string[];
  earliestInteraction: string;
  latestInteraction: string;
}

export interface Statistics {
  userId: string;
  totalInteractions: number;
  categoryBreakdown: { [key: string]: number };
  actionBreakdown: { [key: string]: number };
  earliestInteraction: string;
  latestInteraction: string;
}

export function calculateStatistics2(data: Statistics[]): DataEntry {
  const totalInteractions = data.reduce((sum, item) => sum + item.totalInteractions, 0);

  const categoryBreakdown = data.reduce((acc, item) => {
    Object.entries(item.categoryBreakdown).forEach(([category, count]) => {
      acc[category] = (acc[category] || 0) + count;
    });
    return acc;
  }, {} as { [key: string]: number });

  const actionBreakdown = data.reduce((acc, item) => {
    Object.entries(item.actionBreakdown).forEach(([action, count]) => {
      acc[action] = (acc[action] || 0) + count;
    });
    return acc;
  }, {} as { [key: string]: number });

  const earliestInteraction = data.reduce(
    (earliest, item) =>
      new Date(item.earliestInteraction) < new Date(earliest)
        ? item.earliestInteraction
        : earliest,
    data[0]?.earliestInteraction || new Date().toISOString()
  );

  const latestInteraction = data.reduce(
    (latest, item) =>
      new Date(item.latestInteraction) > new Date(latest)
        ? item.latestInteraction
        : latest,
    data[0]?.latestInteraction || new Date().toISOString()
  );

  const uniqueActions = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.actionBreakdown)))
  );
  const uniqueCategories = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.categoryBreakdown)))
  );

  return {
    totalInteractions,
    categoryBreakdown,
    actionBreakdown,
    uniqueActions,
    uniqueCategories,
    earliestInteraction,
    latestInteraction,
  };
}
