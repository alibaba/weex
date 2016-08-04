package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Type extends TestFlow {
	public AG_Input_Input_Type() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Type");
		testMap.put("step1",new HashMap(){
			{
				put("click", "text");
				put("screenshot", "AG_Input_Input_Type_01_text");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "password");
				put("screenshot", "AG_Input_Input_Type_02_password");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "tel");
				put("screenshot", "AG_Input_Input_Type_03_tel");
			}
		});
		testMap.put("step4",new HashMap(){
			{
				put("click", "email");
				put("screenshot", "AG_Input_Input_Type_04_email");
			}
		});
		testMap.put("step5",new HashMap(){
			{
				put("click", "url");
				put("screenshot", "AG_Input_Input_Type_05_url");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
