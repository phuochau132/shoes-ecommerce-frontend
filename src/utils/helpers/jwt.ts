export function isTokenExpired(token: string | undefined) {
  if (!token) return true;

  // Decode JWT (phần payload ở giữa) để lấy thông tin
  const payload = JSON.parse(atob(token.split('.')[1]));

  // Kiểm tra thời gian hết hạn (`exp`) so với thời gian hiện tại
  const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
  return payload.exp < currentTime; // Trả về `true` nếu token đã hết hạn
}
