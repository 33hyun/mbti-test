import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth"; // 회원가입 API 호출 함수 가져오기

const SignUp = () => {
  // 이메일과 비밀번호 상태를 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 `useNavigate` 사용

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    try {
      await signup({ email, password }); // API 호출하여 회원가입 요청
      alert("회원가입 성공! 로그인 페이지로 이동합니다."); // 성공 메시지 표시
      navigate("/login"); // 로그인 페이지로 이동
    } catch (err) {
      console.error(err.response?.data || err.message); // 콘솔에 오류 메시지 출력
      alert(err.response?.data?.message || "회원가입 실패!"); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">회원가입</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-2">
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
        {/* 회원가입 버튼 */}
        <button type="submit" className="bg-green-500 text-white p-2">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;