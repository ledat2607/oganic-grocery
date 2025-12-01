export function formatTimestamp(timestamp: any) {
  if (!timestamp) return "Unknown";
  if (timestamp.toDate) return timestamp.toDate().toLocaleDateString(); // Firestore Timestamp
  if (timestamp.seconds)
    return new Date(timestamp.seconds * 1000).toLocaleDateString(); // plain object
  return new Date(timestamp).toLocaleDateString(); // fallback
}