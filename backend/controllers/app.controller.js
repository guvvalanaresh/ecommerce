export function getAppConfig(req, res) {
  return res.json({ banners: [], categories: [{ id: 'c1', name: 'Healthy', icon: null }], promotions: [] });
}
