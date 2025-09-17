import { getItems, type ItemWithRelations } from '@/lib/db'

export default async function HomePage() {
  const items: ItemWithRelations[] = await getItems();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stationpedia</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="font-semibold">{item.name}</div>
            {item.categories.length > 0 && (
              <div className="text-sm text-gray-500">
                Categories: {item.categories.map(c => c.name).join(', ')}
              </div>
            )}
            {item.images.length > 0 && (
              <img
                src={item.images[0].url}
                alt={item.name}
                className="mt-1 w-32 h-32 object-cover rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
