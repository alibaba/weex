package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_CommonAttribute_Input_If extends TestFlow {
	public AG_CommonAttribute_Input_If() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_CommonAttribute");
		testMap.put("testChildCaseInit", "AG_CommonAttribute_Input_If");
		testMap.put("step1",new HashMap(){
			{
				put("click", "true");
				put("screenshot", "AG_CommonAttribute_Input_If_01_true");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "false");
				put("screenshot", "AG_CommonAttribute_Input_If_02_false");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
