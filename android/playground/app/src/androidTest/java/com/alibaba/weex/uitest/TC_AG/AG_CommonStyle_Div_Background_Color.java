package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_CommonStyle_Div_Background_Color extends TestFlow {
	public AG_CommonStyle_Div_Background_Color() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_CommonStyle");
		testMap.put("testChildCaseInit", "AG_CommonStyle_Div_Background_Color");
		testMap.put("step1",new HashMap(){
			{
				put("click", "#FF0000");
				put("screenshot", "AG_CommonStyle_Div_Background_Color_01_#FF0000");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "#00FFFF");
				put("screenshot", "AG_CommonStyle_Div_Background_Color_02_#00FFFF");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
