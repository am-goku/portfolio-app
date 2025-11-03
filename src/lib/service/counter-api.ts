const counter_url = import.meta.env.VITE_COUNTER_API_URL;

export async function getViews(): Promise<number> {
    const res = await fetch(counter_url)
    if (res.ok) {
        return (await res.json()).data.up_count || 0;
    } else {
        return 0;
    }
}

export async function increaseViews() {
    const res = await fetch(`${counter_url}/up`);
    if (res.ok) {
        return (await res.json()).data.up_count || 0;
    } else {
        return 0;
    }
}