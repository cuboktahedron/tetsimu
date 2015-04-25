JS_DIR = js
CSS_DIR = css
HTML_DIR = html
TEST_DIR = test
BUILD_DIR = build
DEPLOY_DIR = ${BUILD_DIR}/tetsimu

JS_MODULES = \
    ${JS_DIR}/intro/license.js \
    ${JS_DIR}/global/global.js \
    $(shell ls ${JS_DIR}/constants/*.js) \
    ${JS_DIR}/dispatcher/dispatcher.js \
    ${JS_DIR}/dispatcher/app-dispatcher.js \
    ${JS_DIR}/model/direction.js \
    ${JS_DIR}/model/tetrimino.js \
    $(shell ls -I direction.js -I tetrimino.js ${JS_DIR}/model/*.js) \
    ${JS_DIR}/stores/store-base.js \
    $(shell ls -I store-base.js ${JS_DIR}/stores/*.js) \
    $(shell ls ${JS_DIR}/actions/*.js) \

JSX_MODULES = \
    $(shell ls ${JS_DIR}/components/*.jsx)

# ビルドディレクトリを削除
clean:
	if [ -d ${BUILD_DIR} ]; then \
		rm -rf ${BUILD_DIR}/*; \
	else \
		mkdir ${BUILD_DIR}; \
	fi

# コンパイル
compile: compile-jsx compile-js
	cat ${BUILD_DIR}/tetsimu.js ${BUILD_DIR}/tetsimu-jsx-compiled.js > ${BUILD_DIR}/tetsimu.js.org
	mv ${BUILD_DIR}/tetsimu.js.org ${BUILD_DIR}/tetsimu.js
	yui-compressor ${BUILD_DIR}/tetsimu.js -o ${BUILD_DIR}/tetsimu.min.js.org
	cat ${JS_DIR}/intro/license.js ${BUILD_DIR}/tetsimu.min.js.org > ${BUILD_DIR}/tetsimu.min.js
	rm -f ${BUILD_DIR}/tetsimu-jsx-compiled.js
	rm -f ${BUILD_DIR}/tetsimu.min.js.org

compile-js: ${JS_MODULES}
	cat > ${BUILD_DIR}/tetsimu.js $^

compile-jsx: ${JSX_MODULES}
	cat > ${BUILD_DIR}/tetsimu.jsx.org $^
	jsx ${BUILD_DIR}/tetsimu.jsx.org > ${BUILD_DIR}/tetsimu-jsx-compiled.js
	rm -f ${BUILD_DIR}/tetsimu.jsx.org

deploy: clean compile
	mkdir ${DEPLOY_DIR}
	mkdir ${DEPLOY_DIR}/${JS_DIR}
	mkdir ${DEPLOY_DIR}/${CSS_DIR}
	cp -p index-release.html ${DEPLOY_DIR}/index.html
	cp -rp ${CSS_DIR}/* ${DEPLOY_DIR}/${CSS_DIR}/
	cp -rp ${JS_DIR}/lib ${DEPLOY_DIR}/${JS_DIR}/
	mv ${BUILD_DIR}/*.js ${DEPLOY_DIR}/${JS_DIR}/

tar: deploy
	cd ${BUILD_DIR}; tar cvfz tetsimu.tar.gz tetsimu

