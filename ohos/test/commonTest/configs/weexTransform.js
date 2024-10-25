const weexExtModules = [
    'weexModule',
    'globalEvent',
    'clipboard',
    'navigator',
    'deviceInfo',
    'websocket',
    'picker',
]

function isNeedWeexExtProxy(module) {
    return (weexExtModules.indexOf(module) === -1) ? false : true;
}

module.exports = function({ types: t }) {
    return {
        name: "weexTransform",
        visitor: {
            StringLiteral(path, state) {
            },
            CallExpression(astPath) {
                const node = astPath.node
                const calleePath = astPath.get('callee')
                const callee = calleePath.node
                if (callee.type === 'MemberExpression') {
                    const args = astPath.node.arguments
                    if (
                        args.length === 1 &&
                        t.isStringLiteral(args[0]) &&
                        isNeedWeexExtProxy(args[0].value) &&
                        t.isIdentifier(callee.object) &&
                        callee.object.name === 'weex'
                    ) {
                        if (process.env.ISHARMONY === 'true') {
                            console.log('building weexTransform.js harmony process.env.ISHARMONY:' + process.env.ISHARMONY);
                            // callee.object = t.identifier('weexExt')

                            const parentPath = astPath.parentPath?.parentPath
                            const parentNode = parentPath?.node
                            if (parentNode && t.isVariableDeclaration(parentNode)) {
                                const key = args[0].value

                                const properties = [
                                    t.objectProperty(
                                        t.identifier(key),
                                        t.identifier(key),
                                        false,
                                        true
                                    )
                                ]
                                const objectPattern = t.objectPattern(properties)

                                const requireExpression = t.CallExpression(
                                    t.identifier('require'),
                                    [t.stringLiteral('@ohos/weex-harmony')]
                                )
                                const replaceNode = t.variableDeclaration('const', [
                                    t.variableDeclarator(objectPattern, requireExpression)
                                ])

                                parentPath.replaceWith(replaceNode)
                            } else {
                                if (parentNode && t.isCallExpression(parentNode)) {
                                    const callee = parentNode.callee
                                    const object = callee.object
                                    const requireModuleName = object.arguments[0].value

                                    const requireExpression = t.callExpression(
                                        t.identifier('require'),
                                        [t.stringLiteral('@ohos/weex-harmony')]
                                    )

                                    const memberExpression = t.memberExpression(
                                        requireExpression,
                                        t.identifier(requireModuleName)
                                    )

                                    parentNode.callee.object = memberExpression
                                }
                            }
                        } else {
                            console.log('building weexTransform.js not harmony process.env.ISHARMONY:' + process.env.ISHARMONY);
                        }
                    }
                }
            }
        }
    };
};
