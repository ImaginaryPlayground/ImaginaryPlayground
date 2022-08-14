# [face_recognition](https://github.com/ageitgey/face_recognition)

[다양한 AI](https://zephyrnet.com/ko/%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D%EC%9D%84%EC%9C%84%ED%95%9C-6-%EA%B0%80%EC%A7%80-%EC%B5%9C%EA%B3%A0%EC%9D%98-%EC%98%A4%ED%94%88-%EC%86%8C%EC%8A%A4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/) 중에서 하나를 선정해야 할 줄 알았는데, 압도적으로 자주쓰이는 (한국/외국 상관없이) 얼굴인식 AI가 있어서 해당 AI를 사용하게 되었다.

이유는 간단하다! 사용하기 쉽고 라이브러리 설명이 친절해서!

다양한 웹 사이트를 보면서 진행했는데 그중에서 가장 많이 참고한.. 글 링크가 어디있는지 모르겠다;;

## 설치 에러

참고로 필자는 cmake 다운로드 받을 때 apt-get이 아닌 apt로 설치를 했다, apt로 설치하는 것이 더 편하지만 아직 예전 글이 많아 apt-get으로 설치하라는 글이 많다.

bullseye OS를 사용할 때는 dependency 에러가 너무 심해서 [한 이슈](https://github.com/ageitgey/face_recognition/issues/764)를 참고하여 `pip install --no-dependencies face_recognition`로 설치하고 진행하였다.

이후에 다른 설치 에러 때문에 buster로 다운그레이드한 이후에는 구글링으로 쉽게 해결할 정도의 문제밖에 없었으나 knn을 통해 직접 개개인의 얼굴을 학습하기 위해 추가적인 라이브러리를 설치할 때 문제가 생겼다.

### scikit-learn 설치 에러

`pip3 install scikit-learn` 을 통해 `scikit-learn` 라이브러리 설치도중 또 다시 아주 긴 에러가 생겼다. 핵심적인 에러 문구는 아래와 같다.

```
 Ignoring oldest-supported-numpy: markers 'python_version != "3.7" or platform_machine == "aarch64" or platform_system == "AIX" or platform_python_implementation == "PyPy"' don't match your environment
```

[검색](https://github.com/scipy/oldest-supported-numpy/issues/21)을 해보니 numpy 버전 관련 문제인 것을 알게되었다. `numpy`를 분명히 설치했는데.. 파이썬에서 `import`를 해보니 없었다.

그렇다..! 복원하면서 numpy가 없는 상태로 되돌렸기 때문에 없었다..!

글에서 적힌대로 `numpy==1.14.5`버전을 설치하고 `oldest-supported-numpy`도 설치하고 다시 `scikit-learn` 설치를 진행하였다.

또 다시 다른 종류의 긴 에러가 출력되었다.

<img src="https://user-images.githubusercontent.com/19484971/183807370-fcdd0a67-623d-4146-9a08-49c7d47696ad.png" width=600>

핵심 문구라고 생각되는 부분은 아래와 같다.

```
numpy.distutils.system_info.NotFoundError: No BLAS/LAPACK libraries found.
```

웃기게도 바로 아래부분에 [해결 방법 링크](https://docs.scipy.org/doc/scipy/reference/building/index.html)가 있었다.

진행후 설치가 진행되기는 하는데.. 이상하게도 build에만 4시간이 걸리고 있어서 중간에 취소하였다;

face_recognition 라이브러리를 활용하여 만든 [facial_recognition](https://github.com/carolinedunn/facial_recognition)이 사용하기 좋아보이고 [설치하는 가이드](https://www.tomshardware.com/how-to/raspberry-pi-facial-recognition)도 친절하게 있어서 이쪽으로 시도해보려고 한다.