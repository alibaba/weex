package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_CommonStyle_Switch_Widthandheight extends TestFlow {
	public AG_CommonStyle_Switch_Widthandheight() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_CommonStyle");
		testMap.put("testChildCaseInit", "AG_CommonStyle_Switch_Widthandheight");
		testMap.put("step1",new HashMap(){
			{
				put("click", "200");
				put("screenshot", "AG_CommonStyle_Switch_Widthandheight_01_200");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "400");
				put("screenshot", "AG_CommonStyle_Switch_Widthandheight_02_400");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "200");
				put("screenshot", "AG_CommonStyle_Switch_Widthandheight_03_200");
			}
		});
		testMap.put("step4",new HashMap(){
			{
				put("click", "400");
				put("screenshot", "AG_CommonStyle_Switch_Widthandheight_04_400");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
