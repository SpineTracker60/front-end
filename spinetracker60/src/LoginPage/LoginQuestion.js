import style from './LoginQuestion.module.css'
import { useRef , useState , useEffect} from 'react';
function LoginQuestion() {
    const [buttonStyle, setButtonStyle] = useState('unavailableBtn');
    const [changeValue, setChangeValue] = useState(false);

    const userSex = useRef(null);
    const userBirth = useRef(null);
    const userJob = useRef(null);
    const agreeTerms = useRef(null);

    const buttonChangeStyle = () => {
        const yesUserSex = userSex.current.value == "여성" || userSex.current.value == "남성" || userSex.current.value == "기타";
        const yesUserBirth = userBirth.current.value != '';
        const yesUserJob = userJob.current.value == '학생' || userJob.current.value == '사무직' || userJob.current.value == '개발자' 
        || userJob.current.value == '기획자' || userJob.current.value == '디자이너' || userJob.current.value == '마케터' 
        || userJob.current.value == '크리에이터' || userJob.current.value == '기타';
        const yesAgreeTerms = agreeTerms.current.checked;
        
        const buttonState = yesUserSex && yesUserBirth && yesUserJob && yesAgreeTerms ? 'availableBtn' : 'unavailableBtn';
        setButtonStyle(buttonState);
    }
    const onChangeHandler = () =>{
        setChangeValue(!changeValue)
    }

    useEffect(() =>{
        buttonChangeStyle();
    }
    ,[changeValue])


    return(
        <>  
            <form>
                <div className={style.questionFrame}>
                    <div className={style.questionFrameContents}>
                        <p className={style.loginQuestion}>회원가입 질문</p>
                        <p className={style.dapbyun}>답변해주신 내용은 제품 및 커뮤니티 추천에 사용됩니다.</p>
                        <div className={style.frameContents}>
                            <p className={style.questionText}>성별<sup className={style.upStar}>*</sup></p>
                        
                            <select className={style.selectBox} ref={userSex} onChange={onChangeHandler}>
                                <option disabled selected className={style.selectText}>성별을 골라주세요.</option>
                                <option className={style.selectInnerText}>여성</option>
                                <option className={style.selectInnerText}>남성</option>
                                <option className={style.selectInnerText}>기타</option>
                            </select>

                            <p className={style.questionText}>생년월일<sup className={style.upStar}>*</sup></p>
                            <input type='date' className={style.selectInnerText} ref={userBirth} onChange={onChangeHandler}/>

                            <p className={style.questionText}>직업<sup className={style.upStar}>*</sup></p>
                            <select className={style.selectBox} ref={userJob} onChange={onChangeHandler}>
                                <option disabled selected className={style.selectText}>직업군을 골라주세요.</option>
                                <option className={style.selectInnerText}>학생</option>
                                <option className={style.selectInnerText}>사무직</option>
                                <option className={style.selectInnerText}>개발자</option>
                                <option className={style.selectInnerText}>기획자</option>
                                <option className={style.selectInnerText}>디자이너</option>
                                <option className={style.selectInnerText}>마케터</option>
                                <option className={style.selectInnerText}>크리에이터</option>
                                <option className={style.selectInnerText}>기타</option>
                            </select>
                        </div>             
                            <br/><hr/>
                        <div className={style.frameContents2}>
                            <a className={style.questionText}>이용약관 모두 동의<sup className={style.upStar}>*</sup></a><input type='checkbox' ref={agreeTerms} onChange={onChangeHandler}></input>
                            <br/>
                            <a href='/serviceTerm' target='_blank' className={style.linkText}>서비스 이용약관</a>
                            <br/>
                            <a href='/privacyPolicy' target='_blank' className={style.linkText}>개인정보처리방침</a>
                        </div>
                    </div>
                </div>
                <div className={style.buttonDiv}>
                    <button type='button' className={style[buttonStyle]}>회원가입 완료</button>
                    <button type='button' className={style.logoutBtn}>로그아웃</button>
                </div>
            </form>
            
        </>
    );
}

export default LoginQuestion;