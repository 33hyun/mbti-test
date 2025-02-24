import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // 로그인 API 호출 함수 가져오기

const Login = () => {
  // 이메일과 비밀번호 상태를 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 `useNavigate` 사용

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    try {
      const res = await login({ email, password }); // API 호출하여 로그인 요청
      localStorage.setItem("token", res.data.token); // 받은 JWT 토큰을 로컬 스토리지에 저장
      navigate("/profile"); // 로그인 성공 시 프로필 페이지로 이동
    } catch (err) {
      console.error(err.response?.data || err.message); // 콘솔에 오류 메시지 출력
      alert(err.response?.data?.message || "로그인 실패!"); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        {/* 이메일 입력 필드 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2"
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
        />
        {/* 로그인 버튼 */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;