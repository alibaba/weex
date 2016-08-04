package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Text_Text_Text_Overflow extends TestFlow {
	public AG_Text_Text_Text_Overflow() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Text");
		testMap.put("testChildCaseInit", "AG_Text_Text_Text_Overflow");
		testMap.put("step1",new HashMap(){
			{
				put("click", "clip");
				put("screenshot", "AG_Text_Text_Text_Overflow_01_clip");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "ellipsis");
				put("screenshot", "AG_Text_Text_Text_Overflow_02_ellipsis");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "0");
				put("screenshot", "AG_Text_Text_Text_Overflow_03_0");
			}
		});
		testMap.put("step4",new HashMap(){
			{
				put("click", "1");
				put("screenshot", "AG_Text_Text_Text_Overflow_04_1");
			}
		});
		testMap.put("step5",new HashMap(){
			{
				put("click", "2");
				put("screenshot", "AG_Text_Text_Text_Overflow_05_2");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
