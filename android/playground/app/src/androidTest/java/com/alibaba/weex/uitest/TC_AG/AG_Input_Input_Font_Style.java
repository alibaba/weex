package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Font_Style extends TestFlow {
	public AG_Input_Input_Font_Style() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Font_Style");
		testMap.put("step1",new HashMap(){
			{
				put("click", "normal");
				put("screenshot", "AG_Input_Input_Font_Style_01_normal");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "italic");
				put("screenshot", "AG_Input_Input_Font_Style_02_italic");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
