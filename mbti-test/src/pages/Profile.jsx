import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth"; // 프로필 정보 가져오기 API 함수

const Profile = () => {
  // 사용자 정보를 저장할 상태 변수
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 `useNavigate` 사용

  // 프로필 정보를 가져오는 함수
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 JWT 토큰 가져오기
      if (!token) {
        navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      try {
        const res = await getProfile(token); // API 요청하여 사용자 프로필 정보 가져오기
        setUser(res.data); // 사용자 정보를 상태에 저장
      } catch (err) {
        console.error(err.response?.data || err.message); // 콘솔에 오류 메시지 출력
        alert("프로필 정보를 불러오는 데 실패했습니다."); // 사용자에게 오류 메시지 표시
        navigate("/login"); // 로그인 페이지로 이동
      }
    };

    fetchProfile(); // useEffect 실행 시 프로필 정보 가져오기
  }, [navigate]);

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 JWT 토큰 삭제
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">프로필 페이지</h2>
      {/* 사용자 정보가 있을 때만 표시 */}
      {user ? (
        <div className="text-center">
          <p className="mb-2">이메일: {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-4">
            로그아웃
          </button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;