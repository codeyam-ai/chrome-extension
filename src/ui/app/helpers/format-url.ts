export default function formatUrl(url: string) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
}
