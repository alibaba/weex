import { expect } from 'chai'
import * as style from '../../../../render/vue/validator/style'

describe('check style value', () => {
  const { isCSSColor, isCSSLength, common } = style

  describe('common', () => {
    it('background-color & border-color', () => {
      expect(common('#ABCDEF', 'background-color')).to.be.true
      expect(common('#24hcTO', 'background-color')).to.be.false
      expect(common('rgb(90,32,46)', 'border-color')).to.be.true
      expect(common('#red', 'border-color')).to.be.false
      expect(common('rgba(90,32,46,.24)', 'border-top-color')).to.be.true
      expect(common('black', 'border-right-color')).to.be.true
      expect(common('black', 'border-bottom-color')).to.be.true
      expect(common('black', 'border-left-color')).to.be.true
      expect(common('#red', 'border-top-color')).to.be.false
      expect(common('#red', 'border-right-color')).to.be.false
      expect(common('#red', 'border-bottom-color')).to.be.false
      expect(common('#red', 'border-right-color')).to.be.false

      expect(common('#ABCDEF', 'whatever-color')).to.be.true
      expect(common('#24hcTO', 'whatever-color')).to.be.false
    })

    it('width & height', () => {
      expect(common('32px', 'width')).to.be.true
      expect(common('32px', 'height')).to.be.true
      expect(common(32, 'width')).to.be.true
      expect(common(3.2, 'height')).to.be.true
      expect(common('24hcTO', 'width')).to.be.false
      expect(common('unknown', 'width')).to.be.false
    })

    it('font-size', () => {
      expect(common('32px', 'font-size')).to.be.true
      expect(common('32px', 'height')).to.be.true
      expect(common(32, 'font-size')).to.be.true
      expect(common('24hcTO', 'font-size')).to.be.false
      expect(common('unknown', 'font-size')).to.be.false
    })

    it('margin & padding', () => {
      expect(common('32px', 'margin-left')).to.be.true
      expect(common('32px', 'margin-right')).to.be.true
      expect(common('32px', 'margin-top')).to.be.true
      expect(common('32px', 'margin-bottom')).to.be.true
      expect(common('32px', 'padding-right')).to.be.true
      expect(common(32, 'padding-left')).to.be.true
      expect(common(32, 'padding-top')).to.be.true
      expect(common(32, 'padding-bottom')).to.be.true
      expect(common(3.2, 'padding-right')).to.be.true
      // expect(common('24px', 'margin')).to.be.false
      // expect(common('24px', 'padding')).to.be.false
      expect(common('24hcTO', 'margin-left')).to.be.false
      expect(common('unknown', 'padding-right')).to.be.false
    })

    it('border-*-width', () => {
      expect(common('32px', 'border-top-width')).to.be.true
      expect(common('32px', 'border-right-width')).to.be.true
      expect(common('32px', 'border-bottom-width')).to.be.true
      expect(common('32px', 'border-unknown-width')).to.be.true
      expect(common(32, 'border-left-width')).to.be.true
      expect(common(3.2, 'border-left-width')).to.be.true
      expect(common('24hcTO', 'border-top-width')).to.be.false
      expect(common('unknown', 'border-right-width')).to.be.false
    })

    it('border-*-radius', () => {
      expect(common('32px', 'border-top-right-radius')).to.be.true
      expect(common('32px', 'border-top-left-radius')).to.be.true
      expect(common('32px', 'border-bottom-right-radius')).to.be.true
      expect(common('32px', 'border-bottom-left-radius')).to.be.true
      expect(common('32px', 'border-unknown-radius')).to.be.true
      expect(common(32, 'border-top-left-radius')).to.be.true
      expect(common(3.2, 'border-bottom-left-radius')).to.be.true
      expect(common('24hcTO', 'border-top-right-radius')).to.be.false
      expect(common('unknown', 'border-bottom-right-radius')).to.be.false
    })

    it('border-style', () => {
      expect(common('solid', 'border-style')).to.be.true
      expect(common('dashed', 'border-style')).to.be.true
      expect(common('dotted', 'border-style')).to.be.true
      expect(common('solid', 'border-top-style')).to.be.true
      expect(common('dashed', 'border-right-style')).to.be.true
      expect(common('dotted', 'border-bottom-style')).to.be.true
      expect(common('unknown', 'border-style')).to.be.false
    })
  })

  describe('isCSSColor', () => {
    it('isCSSColor (hash)', () => {
      expect(isCSSColor('#ABCDEF')).to.be.true
      expect(isCSSColor('#AB00EF')).to.be.true
      expect(isCSSColor('#ab00ef')).to.be.true
      expect(isCSSColor('#00CCEF')).to.be.true
      expect(isCSSColor('#A46cef')).to.be.true
      expect(isCSSColor('#352866')).to.be.true
      expect(isCSSColor('#000000')).to.be.true

      expect(isCSSColor('#1')).to.be.false
      expect(isCSSColor('#12')).to.be.false
      expect(isCSSColor('#123')).to.be.true
      expect(isCSSColor('#1234')).to.be.false
      expect(isCSSColor('#12345')).to.be.false
      expect(isCSSColor('#123456')).to.be.true
      expect(isCSSColor('#AA*BGG')).to.be.false
      expect(isCSSColor('#AABBGG')).to.be.false
      expect(isCSSColor('#AABBCCDD')).to.be.false
      expect(isCSSColor('#1234567')).to.be.false
      expect(isCSSColor('#12345678')).to.be.false
      expect(isCSSColor('#DCBE4FDC')).to.be.false
    })

    it('isCSSColor (name)', () => {
      expect(isCSSColor('red')).to.be.true
      expect(isCSSColor('RED')).to.be.true
      expect(isCSSColor('blue')).to.be.true
      expect(isCSSColor('salmon')).to.be.true
      expect(isCSSColor('unknown')).to.be.true

      expect(isCSSColor('+red')).to.be.false
      expect(isCSSColor('red & blue')).to.be.false
    })

    it('isCSSColor (rgb)', () => {
      expect(isCSSColor('rgb(0,0,0)')).to.be.true
      expect(isCSSColor('rgb (0,0,0)')).to.be.true
      expect(isCSSColor('rgb ( 0,0,0 )')).to.be.true
      expect(isCSSColor('rgb ( 0, 0, 0 )')).to.be.true
      expect(isCSSColor('rgb (256, 110, 24)')).to.be.true
      expect(isCSSColor('rgb (25.6, 11.0, .24)')).to.be.true

      expect(isCSSColor('rgb (256,, 24)')).to.be.false
      expect(isCSSColor('rgb (256, 0, 24,)')).to.be.false
      expect(isCSSColor('rgb (256, 0, 24, 0.2)')).to.be.false
    })

    it('isCSSColor (rgba)', () => {
      expect(isCSSColor('rgba(0,0,0,0)')).to.be.true
      expect(isCSSColor('rgba (0,0,0, 0)')).to.be.true
      expect(isCSSColor('rgba ( 0,0,0 , 0)')).to.be.true
      expect(isCSSColor('rgba ( 0, 0, 0 , 0)')).to.be.true
      expect(isCSSColor('rgba (256, 110, 24, 0.5)')).to.be.true
      expect(isCSSColor('rgba (25.6, 11.0, 24, .3)')).to.be.true

      expect(isCSSColor('rgba (256,, 24, 0)')).to.be.false
      expect(isCSSColor('rgba (256, 0, 24,, 0)')).to.be.false
      expect(isCSSColor('rgba (256, 0, 24, 0.2, 0)')).to.be.false
    })
  })

  it('isCSSLength', () => {
    expect(isCSSLength('32px')).to.be.true
    expect(isCSSLength('100%')).to.be.true
    expect(isCSSLength(100)).to.be.true
    expect(isCSSLength(36.25)).to.be.true
    expect(isCSSLength(-6.25)).to.be.true
    expect(isCSSLength('32pt')).to.be.false
    expect(isCSSLength('solid')).to.be.false
  })

  it('position', () => {
    expect(style.position('absolute')).to.be.true
    expect(style.position('relative')).to.be.true
    expect(style.position('solid')).to.be.false
  })

  it('opacity', () => {
    expect(style.opacity('0')).to.be.true
    expect(style.opacity('1')).to.be.true
    expect(style.opacity(0)).to.be.true
    expect(style.opacity(1)).to.be.true
    expect(style.opacity('0.32')).to.be.true
    expect(style.opacity('.32')).to.be.true
    expect(style.opacity(0.32)).to.be.true

    /* eslint-disable no-floating-decimal */
    expect(style.opacity(.32)).to.be.true
    expect(style.opacity(.000001)).to.be.true
    /* eslint-enable no-floating-decimal */

    expect(style.opacity('2')).to.be.false
    expect(style.opacity('-3')).to.be.false
    expect(style.opacity(2)).to.be.false
    expect(style.opacity(-3)).to.be.false
    expect(style.opacity(null)).to.be.false
    expect(style.opacity('fade')).to.be.false
  })

  it('display', () => {
    expect(style.display('flex')).to.be.true
    expect(style.display('block')).to.be.false
    expect(style.display('unknown')).to.be.false
  })

  it('flexDirection', () => {
    expect(style.flexDirection('row')).to.be.true
    expect(style.flexDirection('column')).to.be.true
    expect(style.flexDirection('unknown')).to.be.false
  })

  it('justifyContent', () => {
    expect(style.justifyContent('flex-start')).to.be.true
    expect(style.justifyContent('flex-end')).to.be.true
    expect(style.justifyContent('center')).to.be.true
    expect(style.justifyContent('space-between')).to.be.true
    expect(style.justifyContent('unknown')).to.be.false
  })

  it('alignItems', () => {
    expect(style.alignItems('flex-start')).to.be.true
    expect(style.alignItems('flex-end')).to.be.true
    expect(style.alignItems('center')).to.be.true
    expect(style.alignItems('stretch')).to.be.true
    expect(style.alignItems('space-between')).to.be.false
    expect(style.alignItems('unknown')).to.be.false
  })

  it('flex', () => {
    expect(style.flex('3')).to.be.true
    expect(style.flex(5)).to.be.true
    expect(style.flex(0)).to.be.true
    expect(style.flex(-2)).to.be.false
    expect(style.flex('99999')).to.be.false
  })

  it('fontStyle', () => {
    expect(style.fontStyle('normal')).to.be.true
    expect(style.fontStyle('italic')).to.be.true
    expect(style.fontStyle('oblique')).to.be.true
    expect(style.fontStyle('unknown')).to.be.false
  })

  it('fontWeight', () => {
    expect(style.fontWeight('normal')).to.be.true
    expect(style.fontWeight('bold')).to.be.true
    expect(style.fontWeight('light')).to.be.true
    expect(style.fontWeight('bolder')).to.be.true
    expect(style.fontWeight('lighter')).to.be.true
    expect(style.fontWeight('unknown')).to.be.false
  })

  it('textDecoration', () => {
    expect(style.textDecoration('none')).to.be.true
    expect(style.textDecoration('underline')).to.be.true
    expect(style.textDecoration('line-through')).to.be.true
    expect(style.textDecoration('unknown')).to.be.false
  })

  it('textAlign', () => {
    expect(style.textAlign('left')).to.be.true
    expect(style.textAlign('right')).to.be.true
    expect(style.textAlign('center')).to.be.true
    expect(style.textAlign('solid')).to.be.false
  })

  it('overflow', () => {
    expect(style.overflow('hidden')).to.be.true
    expect(style.overflow('visible')).to.be.true
    expect(style.overflow('solid')).to.be.false
  })

  it('textOverflow', () => {
    expect(style.textOverflow('clip')).to.be.true
    expect(style.textOverflow('ellipsis')).to.be.true
    expect(style.textOverflow('unknown')).to.be.false
  })
})
